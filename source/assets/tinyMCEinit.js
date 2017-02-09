/* global tinymce */
tinymce.init({
	
    selector: "#textArea", menubar: false,
 
    resize : "both",
    statusbar:false ,
    plugins: [
        "advlist autolink lists link image charmap print preview anchor save",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste"
    ],
	  
toolbar: "fontselect fontsizeselect  | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent "
});