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


function ValidacionInputRegistroTramite(dni,nombre,apepat,apemat,celular,email,direccion,folio,asunto,ruc,empresa,archivo){
	Boolean($("#"+dni).val().length>0 && $("#"+dni).val().length==8) ? $("#"+dni).removeClass('is-invalid').addClass("is-valid") : $("#"+dni).removeClass('is-valid').addClass("is-invalid"); 
	Boolean($("#"+nombre).val().length>0) ? $("#"+nombre).removeClass('is-invalid').addClass("is-valid") : $("#"+nombre).removeClass('is-valid').addClass("is-invalid"); 
	Boolean($("#"+apepat).val().length>0) ? $("#"+apepat).removeClass('is-invalid').addClass("is-valid") : $("#"+apepat).removeClass('is-valid').addClass("is-invalid"); 
  Boolean($("#"+apemat).val().length>0) ? $("#"+apemat).removeClass('is-invalid').addClass("is-valid") : $("#"+apemat).removeClass('is-valid').addClass("is-invalid"); 
  Boolean($("#"+celular).val().length>0) ? $("#"+celular).removeClass('is-invalid').addClass("is-valid") : $("#"+celular).removeClass('is-valid').addClass("is-invalid"); 
  // Boolean($("#"+email).val().length>0) ? $("#"+email).removeClass('is-invalid').addClass("is-valid") : $("#"+email).removeClass('is-valid').addClass("is-invalid"); 
  Boolean($("#"+direccion).val().length>0) ? $("#"+direccion).removeClass('is-invalid').addClass("is-valid") : $("#"+direccion).removeClass('is-valid').addClass("is-invalid"); 
  // Boolean($("#"+folio).val().length>0) ? $("#"+folio).removeClass('is-invalid').addClass("is-valid") : $("#"+folio).removeClass('is-valid').addClass("is-invalid"); 
  Boolean($("#"+asunto).val().length>0) ? $("#"+asunto).removeClass('is-invalid').addClass("is-valid") : $("#"+asunto).removeClass('is-valid').addClass("is-invalid"); 
  Boolean($("#"+ruc).val().length>0) ? $("#"+ruc).removeClass('is-invalid').addClass("is-valid") : $("#"+ruc).removeClass('is-valid').addClass("is-invalid"); 
  Boolean($("#"+empresa).val().length>0) ? $("#"+empresa).removeClass('is-invalid').addClass("is-valid") : $("#"+empresa).removeClass('is-valid').addClass("is-invalid"); 
  //Boolean($("#"+archivo).val().length>0) ? $("#"+archivo).removeClass('is-invalid').addClass("is-valid") : $("#"+archivo).removeClass('is-valid').addClass("is-invalid");
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
  var codigo_seg = $("#txt_codigo_seg").val();

  var archivo = $("#txt_archivo").val();
  var extension = archivo.split('.').pop();
  var nombre_archivo = codigo_seg + "." + extension;

  var validaremail =$("#validar_correo").val();

  ValidacionInputRegistroTramite('txtdni','txtnombre','txtapepat','txtapemat','txtcelular','txtemail','txt_direccion','','txt_asunto','txt_ruc','txt_empresa','');

  if(DNI.length==0 ||nombre.length==0 || apepat.length==0 || apemat.length== 0 || celular.length== 0 || email.length==0 || direccion.length== 0 || representacion.length== 0 || tipoDocumento.length== 0 || folios.length== 0 || asunto.length== 0 || codigo_seg.length== 0){
    return Swal.fire("Mensaje de advertencia", "Por favor <b>llene los campos vacios (*)</b>", "warning");
  }

    if(DNI.length < 8) {
        $('#txtdni').focus();
        $("#txtdni").removeClass('is-valid').addClass("is-invalid");
        return Swal.fire("Mensaje de Advertencia","El campo <b>DNI</b>  debe tener como m&iacute;nimo 8 d&iacute;gitos","warning");  
        
    }

    if(celular.length < 9) {
      $('#txtcelular').focus();
      $("#txtcelular").removeClass('is-valid').addClass("is-invalid");
      return Swal.fire("Mensaje de Advertencia","El campo <b>CELULAR</b>  debe tener como m&iacute;nimo 9 d&iacute;gitos","warning");  
    }


    else{
        $("#txtdni").removeClass('is-invalid').addClass("is-valid");
    }

    if (representacion == "Persona Jurídica") {
        if (ruc.length==0 || empresa.length==0) {
            return Swal.fire("Mensaje de Advertencia","Por favor <b>llene los campos vacios (*)</b>","warning");
        }
        if(ruc.length < 11) {
          $('#txt_ruc').focus();
          $("#txt_ruc").removeClass('is-valid').addClass("is-invalid");
          return Swal.fire("Mensaje de Advertencia","El campo <b>RUC</b>  debe tener como m&iacute;nimo 11 d&iacute;gitos","warning");  
          
        }
    }
    if(validaremail == "incorrecto"){
      return Swal.fire(
        "Mensaje De Advertencia",
        "El formato de email es incorrecto, ingrese un formato valido",
        "warning"
      );
    }

    EnviarCorreoTramiteRegistro();

    var form_data = new FormData();
    form_data.append("doc_archivo", $('#txt_archivo')[0].files[0]);
    form_data.append("nombre_archivo", nombre_archivo);

    form_data.append("DNI", DNI);
    form_data.append("nombre", nombre);
    form_data.append("apepat", apepat);
    form_data.append("apemat", apemat);
    form_data.append("celular", celular);
    form_data.append("email", email);
    form_data.append("direccion", direccion);
    form_data.append("representacion", representacion);
    form_data.append("ruc", ruc);
    form_data.append("empresa", empresa);
    form_data.append("tipoDocumento", tipoDocumento);
    form_data.append("folios", folios);
    form_data.append("asunto", asunto);
    form_data.append("codigo_seg", codigo_seg);

$.ajax({
      url:'controlador/tramiteExterno/controlador_tramiteExterno_registrar.php',
      type:'POST',
      data:form_data,
      contentType:false,
      processData:false
//       success: function(respuesta){
//         if(respuesta !=0){
//             Swal.fire('Mensaje De Confirmacion',"Se subio el archivo con exito","success");
//         }
//     }
// });
// return false;

}).done(function(resp){
  // alert(resp);
  if(resp>0){
           if(resp==1){
             //listar_remitente();
              LimpiarCampos();
              EnviarCorreoTramiteRegistro();
              $("#modal_registro").modal('hide');
              Swal.fire("Mensaje de Confirmaci\u00F3n", "Datos correctamente registrados,<b> nuevo documento registrado</b><br><b>Nro Seguimiento:<b><label style='color:#9B0000;'>&nbsp;" + codigo_seg + "</label><br><b>Se Envio el nro de seguimiento al correo brindado</b>", "success")
              .then ( ( value ) =>  {
                $('.form-control').removeClass("is-invalid").removeClass("is-valid");
                $('.form-control').val("");
                document.getElementById("form_registro_tramite").reset();
                document.getElementById('div_juridico').style.display = 'none';
                traer_codigo_seguimiento();
                listar_combo_tipoDocumento()

                // $("#btn_subir").addClass("disabled");
            });

              
              document.getElementById("form_registro_tramite").reset();
              document.getElementById('div_juridico').style.display = 'none';
           }else{
            LimpiarCampos();
            Swal.fire("Mensaje de advertencia", "Ya existe en la base de datos", "warning");
           }
  }else{
    Swal.fire("Mensaje de error", "El registro no se pudo completar", "error");
    traer_codigo_seguimiento();
  }
})
}

function EnviarCorreoTramiteRegistro() {
  var email = $("#txtemail").val();
  var IdTipoDocumento = document.getElementById("cmb_tipodocumento");
  var tipoDocumento = IdTipoDocumento.options[IdTipoDocumento.selectedIndex].text;
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
    //alert(resp);
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

function cambiarNuevoTramite(){
  nueva_busqueda();
  limpiarseguimiento();
  LimpiarCampos();
}

function nueva_busqueda() {
  document.getElementById('div_buscartramite').style.display="block";
  document.getElementById('div_datostramite').style.display="none";
  $("#txt_codigo_seguimiento").val("");
}




function limpiarseguimiento() {
  $("#lb_dni").html("");
  $("#lb_datos").html("");
  $("#lb_direccion").html("");
  $("#lb_email").html("");
  $("#lb_representacion").html("");
  $("#lb_tipodocumento").html("");
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