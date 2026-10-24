<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store, max-age=0');

$url = getenv('NEXT_PUBLIC_SUPABASE_URL') ?: (getenv('SUPABASE_URL') ?: 'https://xjvpyznywisuuykwsedd.supabase.co');
$anonKey = getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY') ?: (getenv('SUPABASE_ANON_KEY') ?: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdnB5em55d2lzdXV5a3dzZWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODc3MzMsImV4cCI6MjA5NTM2MzczM30.tL1qj2pxeB64GtNEn13Y_xzU7yd74DU-N02huw4zOaQ');

echo json_encode(['url' => $url, 'anonKey' => $anonKey]);
