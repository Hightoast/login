<?php
header("Access-Control-Allow-Origin: https://login-steel-one.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json");
$cnx = mysqli_connect("sql112.infinityfree.com", "if0_40934225","NMOHq6Mqy2eRJ5", "if0_40934225_login");
if (!$cnx) {
    echo json_encode(["status" => "error", "msg" => "DB connection failed"]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "msg" => "Invalid request"]);
    exit;
}

$un    = $_POST["un"] ?? "";
$pass  = $_POST["pass"] ?? "";
$email = $_POST["email"] ?? "";
$tel   = $_POST["tel"] ?? "";

$hashedPass = password_hash($pass, PASSWORD_DEFAULT);

/* check email */
$stmt = mysqli_prepare($cnx, "SELECT 1 FROM info WHERE email = ?");
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);

if (mysqli_stmt_num_rows($stmt) > 0) {
    echo json_encode(["status" => "error", "msg" => "Account already exists"]);
    exit;
}
// Optional: check if username + tel combo already exists
$stmt = mysqli_prepare($cnx, "SELECT 1 FROM info WHERE username = ? AND tel = ?");
mysqli_stmt_bind_param($stmt, "ss", $un, $tel);
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);

if (mysqli_stmt_num_rows($stmt) > 0) {
    echo json_encode(["status" => "error", "msg" => "Account with this email and tel already exists"]);
    exit;
}
mysqli_stmt_close($stmt);

/* insert */
$stmt = mysqli_prepare(
    $cnx,
    "INSERT INTO info (username, tel, email, password) VALUES (?, ?, ?, ?)"
);
mysqli_stmt_bind_param($stmt, "ssss", $un, $tel, $email, $pass);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["status" => "ok", "msg" => "Registered successfully"]);
} else {
    echo json_encode(["status" => "error", "msg" => "Insert failed"]);
}

mysqli_stmt_close($stmt);
mysqli_close($cnx);
