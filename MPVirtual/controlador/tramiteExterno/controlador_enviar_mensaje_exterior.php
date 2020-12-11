<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';

    // require '../../modelo/modelo_tramiteExterno.php';
    // $MTE = new Modelo_tramiteExterno();
    $codigoSeguimiento = htmlspecialchars($_POST['codigoSeguimiento'],ENT_QUOTES,'UTF-8');
    $tipoDocumento = htmlspecialchars($_POST['tipoDocumento'],ENT_QUOTES,'UTF-8');
    $asunto = htmlspecialchars($_POST['asunto'],ENT_QUOTES,'UTF-8');
    $email = htmlspecialchars($_POST['email'],ENT_QUOTES,'UTF-8');

    // $consulta = $MTE->Enviar_Mensaje_Exterior($email,$contra);
    // if($consulta=="1"){

        // Instantiation and passing `true` enables exceptions
        $mail = new PHPMailer(true);

        try {

            $mail->SMTPOptions = array(
                'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
                )
            );

            //Server settings
            $mail->SMTPDebug = 0;                      // Enable verbose debug output
            $mail->isSMTP();                                            // Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = 'soporte.cloudnet.2020@gmail.com';                     // SMTP username
            $mail->Password   = '123/*Hola';                               // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
            $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

            //Recipients
            $mail->setFrom('soporte.cloudnet.2020@gmail.com', 'CloudNet');
            $mail->addAddress($email);     // Add a recipient
            //$mail->addAddress('ellen@example.com');               // Name is optional
            //$mail->addReplyTo('info@example.com', 'Information');
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');

            // Attachments
            //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Nuevo tramite Registrado';
            $mail->Body    = 'Su codigo de seguimiento es: <b>'+$codigoSeguimiento+'</b>'.
            '<br> Tipo de tr&aacute;mite: <b>'+$tipoDocumento+'</b>'.
            '<br> Asunto: <b>'+$asunto+'</b>'.
            '<br> Su trámite ha sido recibido, será atendido o derivado a la oficina correspondiente en un plazo máximo de 2 día(s).';
            //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            echo '1';
        } catch (Exception $e) {
            echo "0";
        }
    // }else{
    //     echo '2';
    // }
    //echo $consulta;

?>