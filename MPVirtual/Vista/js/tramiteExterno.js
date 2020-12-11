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
      cadena += "<option value='9'> Otro </option>";
      $("#cmb_tipodocumento").html(cadena);
    } else {
      cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
      $("#cmb_tipodocumento").html(cadena);
    }
  });
}


function traer_codigo_seguimiento() {
  $.ajax({
    url: "controlador/tramiteExterno/controlador_traer_codigo_seguimiento.php",
    type: "POST",
  }).done(function (resp) {
    //alert(resp);
    var data = JSON.parse(resp);
    if (data.length > 0) {
      $("#txt_codigo_seg").val(data[0][0]);
    }
  });
}


function Registro_tramiteExterno(){
  
  EnviarCorreoTramiteRegistro();

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
  var codigo_seg = $("#txt_codigo_seg").val();

if(DNI.length==0 ||nombre.length==0 || apepat.length==0 || apemat.length== 0 || celular.length== 0 || email.length==0 || direccion.length== 0 || representacion.length== 0 || tipoDocumento.length== 0 || folios.length== 0 || asunto.length== 0 || codigo_seg.length== 0){
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
          asunto:asunto,
          codigo_seg:codigo_seg
       }
}).done(function(resp){
  //alert(resp);
  if(resp>0){
           if(resp==1){
             //listar_remitente();
              LimpiarCampos();
              //EnviarCorreoTramiteRegistro();
              $("#modal_registro").modal('hide');
              Swal.fire("Mensaje de Confirmaci\u00F3n", "Datos correctamente registrados,<b> nuevo documento registrado</b><br><b>Nro Seguimiento:<b><label style='color:#9B0000;'>&nbsp;" + codigo_seg + "</label><br><b>Se Envio el nro de seguimiento al correo brindado</b>", "success");
              traer_codigo_seguimiento();
           }else{
           LimpiarCampos();
            Swal.fire("Mensaje de advertencia", "Ya existe en la base de datos", "warning");
           }
  }else{
    Swal.fire("Mensaje de error", "El registro no se pudo completar", "error");
  }
})
}


function EnviarCorreoTramiteRegistro() {
  var email = $("#txtemail").val();
  var tipoDocumento = $("#cmb_tipodocumento").val();
  var asunto = $("#txt_asunto").val();
  var codigo_seg = $("#txt_codigo_seg").val();
  $.ajax({
      url:'controlador/tramiteExterno/controlador_enviar_mensaje_exterior.php',
      type:'POST',
      data:{
          codigoSeguimiento:codigo_seg,
          tipoDocumento:tipoDocumento,
          asunto:asunto,
          email:email
      }
  })
  .done(function(resp){
    alert(resp);
  })
}


function buscar_tramite_exterior() {
  var codigo_seguimiento = $("#txt_codigo_seguimiento").val();
  if (codigo_seguimiento.length==0) {
      Boolean($("#txt_codigo_seguimiento").val().length>0) ? $("#txt_codigo_seguimiento").removeClass('is-invalid').addClass("is-valid") : $("#txt_codigo_seguimiento").removeClass('is-valid').addClass("is-invalid"); 
      return Swal.fire("Mensaje de Advertencia","Falta Llenar datos","warning");
  }
  $("#btn_buscar").prop("disabled", true);
  $('#txt_codigo_seguimiento').removeClass("is-invalid").removeClass("is-valid");
  $.ajax({
      url:'controlador/tramiteExterno/controlador_tramite_externo_buscar.php',
      type:'POST',
      data:{
        codigo_seguimiento:codigo_seguimiento
      }
  })
  .done(function(resp){
      var data = JSON.parse(resp);
      limpiarseguimiento();
  
      // alert(data[0][1]);

      $("#btn_buscar").prop("disabled", false);
      if (data.length > 0) {
          document.getElementById('div_datostramite').style.display="block";
          document.getElementById('div_buscartramite').style.display="none";
          $("#lb_dni").html(data[0][0]);
          $("#lb_datos").html(data[0][1]);
          $("#lb_direccion").html(data[0][2]);
          $("#lb_email").html(data[0][3]);
          $("#lb_representacion").html(data[0][4]);
          $("#lb_tipodocumento").html(data[0][5]);
          $("#lb_asunto").html(data[0][6]);
          $('#div_historial2').html("");
          var cadena_seguimiento = "";
          var cadena_seguimiento2 = "";
                    cadena_seguimiento+='<div class="time-label">';
                   cadena_seguimiento+=  ' <span class="bg-red">Fecha Inicio: '+data[0][7]+'</span>';
                  cadena_seguimiento+=  '</div>';
                  cadena_seguimiento+= ' <div>';
                   cadena_seguimiento+= '  <i class="fas fa-university bg-blue"></i>';
                    cadena_seguimiento+= ' <div class="timeline-item">';
                     cadena_seguimiento+= '  <span class="time"><i class="fas fa-clock"></i> '+data[0][8]+'</span>';
                      cadena_seguimiento+= ' <h3 class="timeline-header"> '+data[0][7]+'</h3>';
                      cadena_seguimiento+= ' <div class="timeline-body">';
                         cadena_seguimiento+=  'Su trámite ha sido recibido, será atendido o derivado a la oficina correspondiente en un plazo máximo de 2 día(s).';
                    cadena_seguimiento+= '  </div>';
                   cadena_seguimiento+=  ' </div>';
                 cadena_seguimiento+= ' </div>';
                 $('#div_historial2').append(cadena_seguimiento);
                detalle_tramite();
      }else{
          document.getElementById('div_buscartramite').style.display="block";
          document.getElementById('div_datostramite').style.display="none";
          Swal.fire("Mensaje de Advertencia","Lo sentimos, el <label>nro de documento</label> ingresado no se encuentra registrado en nuestra data","warning");
      }
  })
}


function detalle_tramite() {
  var cod_seguimiento = $("#txt_codigo_seguimiento").val();

  $.ajax({
      url:'controlador/tramiteExterno/controlador_tramite_seguimiento_listar.php',
      type:'POST',
      data:{
        cod_seguimiento:cod_seguimiento
      }
  })
  .done(function(resp2){
      // alert(resp2);
      var data2 = JSON.parse(resp2);
      if (data2.length > 0) {
          var cadena_seguimiento = "";
          for (var j = 0; j < data2.length; j++) {
              
              cadena_seguimiento += '<div>';
              if (data2[j][4]=="1") {
                  cadena_seguimiento += '<i class="fas fa-reply-all bg-yellow"></i>';
              }else{
                  if (data2[j][4]=="4") {
                      cadena_seguimiento += '<i class="fas fa-comments bg-danger"></i>';
                  }else{
                      if (data2[j][4]=="5") {
                          cadena_seguimiento += '<i class="fas fa-comments bg-purple"></i>';
                      }else{
                          cadena_seguimiento += '<i class="fas fa-comments bg-success"></i>';
                      }
                  }
              }
                cadena_seguimiento += '<div class="timeline-item">';
                  cadena_seguimiento += ' <span class="time"><i class="fas fa-clock"></i> '+data2[j][2]+'</span>';
                  cadena_seguimiento += ' <h3 class="timeline-header"> '+data2[j][1]+'</h3>';
                  cadena_seguimiento += ' <div class="timeline-body">';
                  if (data2[j][4]=="1") {
                      cadena_seguimiento +=  ' Su tr&aacute;mite ha sido derivado a <b>'+data2[j][0]+'</b>';
                  }else{
                      if (data2[j][4]=="4") {
                        cadena_seguimiento +=  ' Su tr&aacute;mite ha sido <b> RECHAZADO </b> en <b>'+data2[j][0]+'</b>';
                      }else{
                          //alert(data2[j][8]);
                          if (data2[j][4]=="5") {
                            cadena_seguimiento +=  ' Su tr&aacute;mite ha <b> FINALIZADO </b> en <b>'+data2[j][0]+'</b>';
                          }else{
                              cadena_seguimiento +=  ' Su tr&aacute;mite ha sido <b> ACEPTADO </b> en <b>'+data2[j][0]+'</b>, ser&aacute; atendido o derivado a la oficina correspondiente';
                          }
                      }
                  }
                  cadena_seguimiento += ' </div>';
                  cadena_seguimiento += ' <div class="timeline-footer" style="padding: 10px;">';
                    if(data2[j][3]==null){cadena_seguimiento += ' " "'}else{cadena_seguimiento += ' " '+data2[j][3]+' "'};
                 cadena_seguimiento += '  </div>';
                cadena_seguimiento += ' </div>';
              cadena_seguimiento += ' </div>';
              cadena_seguimiento += '<div>';
              cadena_seguimiento += '<i class="fas fa-clock bg-gray"></i>';
            cadena_seguimiento += '</div>';
          }
           $('#div_historial').html(cadena_seguimiento);
          //tercero();
      }
  })
}


function nueva_busqueda() {
  document.getElementById('div_buscartramite').style.display="block";
  document.getElementById('div_datostramite').style.display="none";
}




function limpiarseguimiento() {
  $("#lb_dni").html("");
  $("#lb_datos").html("");
  $("#lb_direccion").html("");
  $("#lb_email").html("");
  $("#lb_representacion").html("");
  $("#lb_tipodocumento").html("");
  $("#lb_nrodocumento").html("");
  $("#lb_iddocumento").html("");
  $("#lb_asunto").html("");
  $('#div_historial').html("");
  $('#div_historial2').html("");
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