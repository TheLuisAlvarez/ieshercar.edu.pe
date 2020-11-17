<?php
    require '../../modelo/modelo_tramiteExterno.php';
    $MU = new Modelo_tramiteExterno();
    $consulta = $MU->listar_combo_tipoDocumento();
        echo json_encode($consulta);

?>