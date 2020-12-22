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

    function Codigo_seguimiento(){
        $sql = "call SP_GENERAR_CODIGO_SEGUIMIENTO()";
        $arreglo = array();
        if ($consulta = $this->conexion->conexion->query($sql)) {
            while ($consulta_VU = mysqli_fetch_array($consulta)) {
                    $arreglo[] = $consulta_VU;
                
            }
            return $arreglo;
            $this->conexion->cerrar();
        }
    }

    function Registrar_tramiteExterno($DNI,$nombre,$apepat,$apemat,$celular,$email,$direccion,$representacion,$ruc,$empresa,$tipoDocumento,$folios,$asunto,$codigo_seg,$nombre_archivo){
        $sql = "call SP_REGISTRAR_TRAMITE_EXTERNO('$DNI','$nombre','$apepat','$apemat','$celular','$email','$direccion','$representacion','$ruc','$empresa','$tipoDocumento','$folios','$asunto','$codigo_seg','$nombre_archivo')";
        
        if ($resultado = $this->conexion->conexion->query($sql)) {
           $id_retornado  = mysqli_insert_id($this->conexion->conexion);
                return 1;
            }else {
                return 0;
            }
            $this->conexion->cerrar();
    }

    function Buscar_Tramite_Seguimiento($cod_seguimiento){
        $sql = "call SP_BUSCAR_TRAMITE_SEGUIMIENTO('$cod_seguimiento')";
        $arreglo = array();
        if ($consulta = $this->conexion->conexion->query($sql)) {
            while ($consulta_VU = mysqli_fetch_array($consulta)) {
                $arreglo[] = $consulta_VU;
    
            }
            return $arreglo;
            $this->conexion->cerrar();
        }
    }

    function Listar_Seguimiento_Tramite_Exterior($cod_seguimiento){
        $sql = "call SP_LISTAR_SEGUIMIENTO_TRAMITE_EXTERIOR('$cod_seguimiento')";
        $arreglo = array();
        if ($consulta = $this->conexion->conexion->query($sql)) {
            while ($consulta_VU = mysqli_fetch_array($consulta)) {
                $arreglo[] = $consulta_VU;
    
            }
            return $arreglo;
            $this->conexion->cerrar();
        }
    }

}
?>