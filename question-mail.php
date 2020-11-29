<?php
if($_SERVER["REQUEST_METHOD"] == 'POST'){
    $phone = $_POST['phone'];

    $content = 'У клиента имеется вопрос, перезвните по номерк: ' . $phone;

    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

    $success = mail('callme@whitelotus.com', 'Запрос на звонок', $content, $headers);

    if ($success){
        http_response_code(200);
        echo "Письмо отправлено";
    } else{
        http_response_code(500);
        echo "Письмо не отправлено";
    }
} else{
    http_response_code(403);
    echo "Данный тип запроса не поддерживается";
}