function listar_combo_tipoDocumento() {
  $.ajax({
    url: "controlador/tramiteExterno/controlador_combo_tipoDocumento_listar.php",
    type: "POST",
  }).done(function (resp) {
    //alert(resp);
    var data = JSON.parse(resp);
    var cadena = "";
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        cadena +=
          "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
      }
      $("#cmb_tipodocumento").html(cadena);
    } else {
      cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
      $("#cmb_tipodocumento").html(cadena);
    }
  });
}


function Registro_tramiteExterno(){
  var DNI = $("#txtdni").val();
  var nombre = $("#txtnombre").val();
  var apepat = $("#txtapepat").val();
  var apemat = $("#txtapemat").val();
  //var genero = $("#cbm_sexo").val();
  var celular = $("#txtcelular").val();
  var email = $("#txtemail").val();
  var direccion = $("#txt_direccion").val();
  var representacion = $("#txt_representacion").val();
  var ruc = $("#txt_ruc").val();
  var empresa = $("#txt_empresa").val();
  var tipoDocumento = $("#cmb_tipodocumento").val();
  var folios = $("#txt_folios").val();
  var asunto = $("#txt_asunto").val();

if(DNI.length==0 ||nombre.length==0 || apepat.length==0 || apemat.length== 0 || celular.length== 0 || email.length==0 || direccion.length== 0 || representacion.length== 0|| tipoDocumento.length== 0|| folios.length== 0|| asunto.length== 0){
  return Swal.fire("Mensaje de advertencia", "Llene los campos vacios", "warning");
}

$.ajax({
  "url":"controlador/tramiteExterno/controlador_tramiteExterno_registrar.php",
       type:'POST',
       data:{
          DNI: DNI,
          nombre:nombre,
          apepat:apepat,
          apemat:apemat,
          //sexo:sexo,
          celular:celular,
          email:email,
          direccion:direccion,
          representacion:representacion,
          ruc:ruc,
          empresa:empresa,
          tipoDocumento:tipoDocumento,
          folios:folios,
          asunto:asunto
       }
}).done(function(resp){
  //alert(resp);
  if(resp>0){
           if(resp==1){
             //listar_remitente();
             LimpiarCampos();
            $("#modal_registro").modal('hide');
            Swal.fire("Mensaje de confirmacion", "Datos guardados correctamente", "success");
           }else{
           LimpiarCampos();
            Swal.fire("Mensaje de advertencia", "Ya existe en la base de datos", "warning");
           }
  }else{
    Swal.fire("Mensaje de error", "El registro no se pudo completar", "error");
  }
})
}


function LimpiarCampos(){
	$("#txtdni").val("");
  $("#txtnombre").val("");
  $("#txtapepat").val("");
  $("#txtapemat").val("");
  $("#txtcelular").val("");
  $("#txtemail").val("");
  $("#txt_direccion").val("");
  $("#txt_ruc").val("");
  $("#txt_empresa").val("");
  $("#txt_folios").val("");
  $("#txt_asunto").val("");

}