<?php
    require '../../modelo/modelo_tramiteExterno.php';
    $MTE = new Modelo_tramiteExterno();
    $cod_seguimiento = htmlspecialchars($_POST['codigo_seguimiento'],ENT_QUOTES,'UTF-8');
    $consulta = $MTE->Buscar_Tramite_Seguimiento($cod_seguimiento);
    $data = json_encode($consulta);
    if(count($consulta)>0){
        echo $data;
    }else{
        echo 0;
    }

?>
