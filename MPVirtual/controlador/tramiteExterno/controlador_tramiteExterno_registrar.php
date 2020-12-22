<?php
    require '../../modelo/modelo_tramiteExterno.php';
    $MTE = new Modelo_tramiteExterno();
    
    $DNI = htmlspecialchars($_POST['DNI'],ENT_QUOTES,'UTF-8'); 
    $nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8'); 
    $apepat = htmlspecialchars($_POST['apepat'],ENT_QUOTES,'UTF-8'); 
    $apemat = htmlspecialchars($_POST['apemat'],ENT_QUOTES,'UTF-8'); 
    //$sexo = htmlspecialchars($_POST['sexo'],ENT_QUOTES,'UTF-8'); 
    $celular = htmlspecialchars($_POST['celular'],ENT_QUOTES,'UTF-8'); 
    $email = htmlspecialchars($_POST['email'],ENT_QUOTES,'UTF-8'); 
    $direccion = htmlspecialchars($_POST['direccion'],ENT_QUOTES,'UTF-8'); 
    $representacion = htmlspecialchars($_POST['representacion'],ENT_QUOTES,'UTF-8'); 
    $ruc = htmlspecialchars($_POST['ruc'],ENT_QUOTES,'UTF-8'); 
    $empresa = htmlspecialchars($_POST['empresa'],ENT_QUOTES,'UTF-8'); 
    $tipoDocumento = htmlspecialchars($_POST['tipoDocumento'],ENT_QUOTES,'UTF-8'); 
    $folios = htmlspecialchars($_POST['folios'],ENT_QUOTES,'UTF-8'); 
    $asunto = htmlspecialchars($_POST['asunto'],ENT_QUOTES,'UTF-8'); 
    $codigo_seg = htmlspecialchars($_POST['codigo_seg'],ENT_QUOTES,'UTF-8');

    $nombre_archivo = htmlspecialchars($_POST['nombre_archivo'],ENT_QUOTES,'UTF-8');


    if(is_array($_FILES) && count($_FILES)>0){

        if(move_uploaded_file($_FILES["archivo"]["tmp_name"],"tramites/".$nombre_archivo){
            $nombre_archivo = 'tramites/'.$nombre_archivo;

            $consulta = $MTE->Registrar_tramiteExterno($DNI,$nombre,$apepat,$apemat,$celular,$email,$direccion,$representacion,$ruc,$empresa,$tipoDocumento,$folios,$asunto,$codigo_seg,$nombre_archivo);

            echo $consulta;

        }else{
            echo 0;
        }
    
    }else{
        echo 0;
    }

?>
