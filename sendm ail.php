<?php
    if (extension_loaded("openssl")) {
        print("yea");
    } else {
        print("no");
    }
    if ($inipath) {
        print('Loaded php.ini: ' . $inipath);
    } else {
        print('A php.ini file is not loaded');
    }

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';


    $mail = new PHPMailer(true);
    $mail->CharSet = "UTF-8";
    $mail->setLanguage("ru", "php.mailer/language/");
    $mail->IsHTML(true);

    $mail->SMTPDebug = 2;
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    $mail->Port = 465;
    $mail->Host = "smtp.gmail.com";
    $mail->Username = "iv.artemij@gmail.com";
    $mail->Password = "xaybeflyfygvuoqd";
    $mail->SMTPSecure = 'ssl';
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    //От кого 
    $mail->setFrom("iv.artemij@gmail.com", "Новый заказ!");
    //Кому
    $mail->addAddress("katrin.felice@mail.com");
    //Тема
    $mail->Subject = "Новый заказ!";



    $body = "<h1>Новый заказ!</h1>";


    $name = $_POST["name"]; /* Принимаем имя пользователя с формы .. */
    $email = $_POST["email"]; /* Почту */
    $phone = $_POST["phone"]; /* Телефон */


    $body.= $name . " " . $email . " " . $phone;


    $mail->Body = $body;

    $mail -> send();
    print("Отправлено");
?>
    