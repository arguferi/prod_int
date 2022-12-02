$(document).ready(function(){

    // Modal

    $(".modal").on("click", function (e) {
        console.log(e);
        if (($(e.target).hasClass("modal-main") || $(e.target).hasClass("close-modal")) && $("#loading").css("display") == "none") {
            closeModal();
        }
    });

    // -> Modal

    // Abrir el inspector de archivos
    
    $(document).on("click", "#add-photo", function(){
        $("#add-new-photo").click();
    });
    
    // -> Abrir el inspector de archivos

    // Cachamos el evento change
    
    $(document).on("change", "#add-new-photo", function () {
    
        console.log(this.files);
        var files = this.files;
        var element;
        var supportedImages = ["image/jpeg", "image/png", "image/gif"];
        var seEncontraronElementoNoValidos = false;

        for (var i = 0; i < files.length; i++) {
            element = files[i];
            
            if (supportedImages.indexOf(element.type) != -1) {
                createPreview(element);
            }
            else {
                seEncontraronElementoNoValidos = true;
            }
        }

        //Aquí empieza la creación de un nuevo input file
        $("#add-new-photo").removeAttr("id");
        var newInputFile = createInputFile();
        $("#add-photo-container").append(newInputFile);

        if (seEncontraronElementoNoValidos) {
            showMessage("Se encontraron archivos no validos.");
        }
        else {
            showMessage("Todos los archivos se subieron correctamente.");
        }
    
    });
    
    // -> Cachamos el evento change

    // Eliminar previsualizaciones
    
    $(document).on("click", "#Images .image-container", function(e){
        $(this).parent().remove();
    });
    
    // -> Eliminar previsualizaciones

    // Eliminar imagenes subidas

    $(document).on("click", "#MyImages .image-container", function (e) {
        var parent = $(this).parent();
        var id = $(parent).attr("data-id");
        var data = {
            id : id
        }
        $.post("delete.php", data, function(res) {
            if (res == "true") {
                showMessage("¡Imagenes eliminadas correctamente!");
                $(parent).remove();
            }
            else {
                showMessage("Lo sentimos, hubo un error eliminando esta imagen.");
            }
        });
    });

    // -> Eliminar imagenes subidas

});