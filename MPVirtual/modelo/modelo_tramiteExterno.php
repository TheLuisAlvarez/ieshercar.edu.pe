<?php
class Modelo_tramiteExterno{
    private $conexion;
    function __construct(){
        require_once 'modelo_conexion.php';
        $this->conexion = new conexion();
        $this->conexion->conectar();
    }

    function listar_combo_tipoDocumento(){
        $sql = "call SP_LISTAR_COMBO_TIPODOCUMENTO()";
        $arreglo = array();
        if ($consulta = $this->conexion->conexion->query($sql)) {
            while ($consulta_VU = mysqli_fetch_array($consulta)) {
              
                    $arreglo[] = $consulta_VU;
                
            }
            return $arreglo;
            $this->conexion->cerrar();
        }
    }

    function Registrar_tramiteExterno($DNI,$nombre,$apepat,$apemat,$celular,$email,$direccion,$representacion,$ruc,$empresa,$tipoDocumento,$folios,$asunto){
        $sql = "call SP_REGISTRAR_TRAMITE_EXTERNO('$DNI','$nombre','$apepat','$apemat','$celular','$email','$direccion','$representacion','$ruc','$empresa','$tipoDocumento','$folios','$asunto')";
        if ($consulta = $this->conexion->conexion->query($sql)) {
            if ($row = mysqli_fetch_array($consulta)) {
                    return $id= trim($row[0]);
            }
            $this->conexion->cerrar();
        }
    }


}
?>