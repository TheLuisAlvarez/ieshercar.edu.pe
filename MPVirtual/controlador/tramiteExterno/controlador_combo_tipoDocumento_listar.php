<?php
    require '../../modelo/modelo_tramiteExterno.php';
    $MTE = new Modelo_tramiteExterno();
    $consulta = $MTE->listar_combo_tipoDocumento();
        echo json_encode($consulta);

?>