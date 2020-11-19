<?php
    require '../../modelo/modelo_tramiteExterno.php';
    $MTE = new Modelo_tramiteExterno();
    $consulta = $MTE->Codigo_seguimiento();
        echo json_encode($consulta);

?>