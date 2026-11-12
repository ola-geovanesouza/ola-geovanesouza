<?php
declare(strict_types=1);

const MODERN_VERSION = '2026-07-28';
const LEGACY_VERSIONS = ['2025-11-25', '2025-06-18'];
const SERVER_NAME = 'com.geovanesouza.portfolio';
const SERVER_TITLE = 'Geovane Souza Portfolio';
const SERVER_VERSION = '1.0.0';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, MCP-Protocol-Version, Mcp-Method, Mcp-Name');
header('Access-Control-Expose-Headers: MCP-Protocol-Version');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function respond(int $status, array $payload, ?string $protocolVersion = null): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    if ($protocolVersion !== null) {
        header('MCP-Protocol-Version: ' . $protocolVersion);
    }
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function rpcError(mixed $id, int $code, string $message, ?array $data = null): array
{
    $error = ['code' => $code, 'message' => $message];
    if ($data !== null) {
        $error['data'] = $data;
    }
    return ['jsonrpc' => '2.0', 'id' => $id, 'error' => $error];
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, ['error' => 'Use POST with an MCP JSON-RPC request.']);
}

if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
    respond(415, ['error' => 'Content-Type must be application/json.']);
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 16384) {
    respond(413, ['error' => 'Request body exceeds the 16 KB limit.']);
}
$request = json_decode($raw, true);
if (!is_array($request) || ($request['jsonrpc'] ?? null) !== '2.0' || !is_string($request['method'] ?? null)) {
    respond(400, rpcError(is_array($request) ? ($request['id'] ?? null) : null, -32600, 'Invalid JSON-RPC request'));
}

$id = $request['id'] ?? null;
$method = $request['method'];
$params = is_array($request['params'] ?? null) ? $request['params'] : [];
$meta = is_array($params['_meta'] ?? null) ? $params['_meta'] : [];
$bodyVersion = $meta['io.modelcontextprotocol/protocolVersion'] ?? null;
$headerVersion = $_SERVER['HTTP_MCP_PROTOCOL_VERSION'] ?? null;
$methodHeader = $_SERVER['HTTP_MCP_METHOD'] ?? null;
$nameHeader = $_SERVER['HTTP_MCP_NAME'] ?? null;
$modern = $bodyVersion !== null || $headerVersion === MODERN_VERSION;

if ($modern) {
    if ($headerVersion !== MODERN_VERSION || $bodyVersion !== MODERN_VERSION) {
        respond(400, rpcError($id, -32022, 'Unsupported protocol version', ['supported' => [MODERN_VERSION], 'requested' => $bodyVersion ?? $headerVersion]));
    }
    if ($methodHeader === null || $methodHeader !== $method) {
        respond(400, rpcError($id, -32020, 'MCP method header does not match request method'));
    }
    if (!isset($meta['io.modelcontextprotocol/clientInfo']['name'], $meta['io.modelcontextprotocol/clientInfo']['version']) || !isset($meta['io.modelcontextprotocol/clientCapabilities'])) {
        respond(400, rpcError($id, -32600, 'Modern MCP requests must include clientInfo and clientCapabilities in _meta'), MODERN_VERSION);
    }
    if ($method === 'tools/call' && (!is_string($params['name'] ?? null) || $nameHeader === null || rawurldecode($nameHeader) !== $params['name'])) {
        respond(400, rpcError($id, -32020, 'MCP name header does not match tool name'), MODERN_VERSION);
    }
} elseif ($headerVersion !== null && !in_array($headerVersion, LEGACY_VERSIONS, true)) {
    respond(400, rpcError($id, -32022, 'Unsupported protocol version', ['supported' => array_merge([MODERN_VERSION], LEGACY_VERSIONS), 'requested' => $headerVersion]));
} elseif ($methodHeader !== null && $methodHeader !== $method) {
    respond(400, rpcError($id, -32600, 'MCP method header does not match request method'), $headerVersion ?? LEGACY_VERSIONS[0]);
}

if ($id === null) {
    // This public read-only endpoint has no client-directed notifications to process.
    http_response_code(202);
    exit;
}

$tool = [
    'name' => 'get_geovane_portfolio_info',
    'title' => 'Informações do portfólio de Geovane Souza',
    'description' => 'Consulta informações públicas sobre áreas profissionais, projetos, negócios, reconhecimentos ou formas de contato.',
    'inputSchema' => [
        'type' => 'object',
        'properties' => [
            'topic' => [
                'type' => 'string',
                'enum' => ['overview', 'areas', 'projects', 'businesses', 'recognition', 'contact'],
                'description' => 'Assunto a consultar.'
            ]
        ],
        'required' => ['topic'],
        'additionalProperties' => false
    ],
    'annotations' => ['readOnlyHint' => true, 'destructiveHint' => false, 'openWorldHint' => false]
];
$serverMeta = ['io.modelcontextprotocol/serverInfo' => ['name' => SERVER_NAME, 'version' => SERVER_VERSION]];
$instructions = 'Consulta somente informações públicas do portfólio. A ferramenta não executa ações externas; o visitante decide se deseja entrar em contato.';

if ($modern && $method === 'server/discover') {
    respond(200, ['jsonrpc' => '2.0', 'id' => $id, 'result' => [
        'resultType' => 'complete',
        'supportedVersions' => array_merge([MODERN_VERSION], LEGACY_VERSIONS),
        'capabilities' => ['tools' => ['listChanged' => false]],
        '_meta' => $serverMeta,
        'instructions' => $instructions,
        'ttlMs' => 3600000,
        'cacheScope' => 'public'
    ]], MODERN_VERSION);
}

if (!$modern && $method === 'initialize') {
    $requested = $params['protocolVersion'] ?? LEGACY_VERSIONS[0];
    if (!in_array($requested, LEGACY_VERSIONS, true)) {
        respond(400, rpcError($id, -32602, 'Unsupported legacy protocol version; use 2025-11-25, 2025-06-18, or the modern 2026-07-28 protocol.'), LEGACY_VERSIONS[0]);
    }
    respond(200, ['jsonrpc' => '2.0', 'id' => $id, 'result' => [
        'protocolVersion' => $requested,
        'capabilities' => ['tools' => ['listChanged' => false]],
        'serverInfo' => ['name' => SERVER_NAME, 'title' => SERVER_TITLE, 'version' => SERVER_VERSION],
        'instructions' => $instructions
    ]], $requested);
}

if ($method === 'tools/list') {
    $result = ['tools' => [$tool]];
    if ($modern) {
        $result = array_merge(['resultType' => 'complete'], $result, ['ttlMs' => 3600000, 'cacheScope' => 'public', '_meta' => $serverMeta]);
    }
    respond(200, ['jsonrpc' => '2.0', 'id' => $id, 'result' => $result], $modern ? MODERN_VERSION : ($headerVersion ?? LEGACY_VERSIONS[0]));
}

if ($method === 'tools/call') {
    $name = $params['name'] ?? '';
    $topic = $params['arguments']['topic'] ?? 'overview';
    $answers = [
        'overview' => 'Geovane Souza é Product Manager e Engenheiro de Software com foco em IA, em Salvador, Bahia. Atua em produto digital, IA aplicada, UX, design, engenharia de software e operação de negócios.',
        'areas' => 'Frentes: Produto, Atuação, Empreendedorismo, Segmentos, Portfólio e Skill. O trabalho conecta estratégia, pesquisa, benchmarking, processos, engenharia, UX, IA, liderança e entrega.',
        'projects' => 'Projetos selecionados: Atlas AI, Cuida e Amor, EduServen e Dot10. Portfólio: https://geovanesouza.com/#projetos.',
        'businesses' => 'Negócios: Young DevOps, LeadFinder, GeoServices Tech, JovnArt | gs™ e Portal da Reputação (em desenvolvimento). Detalhes: https://geovanesouza.com/#negocios.',
        'recognition' => 'O site apresenta cinco reconhecimentos profissionais, mais de dez recomendações no LinkedIn e o registro de programa de computador BR512025000624-1, concedido pelo INPI em 18/02/2025. Detalhes: https://geovanesouza.com/#reconhecimento.',
        'contact' => 'E-mail: ola@geovanesouza.com. WhatsApp: https://wa.me/5571988895138. LinkedIn: https://www.linkedin.com/in/ola-geovanesouza/. Currículo: https://geovanesouza.com/cv-geovane-vieira-de-souza-pt-br.pdf.'
    ];
    if ($name !== $tool['name'] || !is_string($topic) || !array_key_exists($topic, $answers)) {
        respond(200, rpcError($id, -32602, 'Unknown tool or topic'), $modern ? MODERN_VERSION : ($headerVersion ?? LEGACY_VERSIONS[0]));
    }
    $result = ['content' => [['type' => 'text', 'text' => $answers[$topic]]], 'isError' => false];
    if ($modern) {
        $result = array_merge(['resultType' => 'complete'], $result, ['_meta' => $serverMeta]);
    }
    respond(200, ['jsonrpc' => '2.0', 'id' => $id, 'result' => $result], $modern ? MODERN_VERSION : ($headerVersion ?? LEGACY_VERSIONS[0]));
}

if ($modern) {
    respond(404, rpcError($id, -32601, 'Method not found'), MODERN_VERSION);
}
respond(200, rpcError($id, -32601, 'Method not found'), $headerVersion ?? LEGACY_VERSIONS[0]);
