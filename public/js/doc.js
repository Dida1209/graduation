/**
 * Created by lenovo-pc on 2017/3/31.
 */
window.onload=function(){
    console.log('pdfobject');
    if(PDFObject.supportsPDFs){
        console.log("Yay, this browser supports inline PDFs.");
    } else {
        console.log("Boo, inline PDFs are not supported by this browser");
    }
    // $.ajax({
    //     url:'/doc/'+$('#example').attr('data-src'),
    //     method:'get',
    //     success:function(data){
    //         console.log(data);
    var url='http://localhost:3000/doc/'+$('#example').attr('data-src');
            PDFObject.embed(url,'#example')
    //     }
    // })
}
