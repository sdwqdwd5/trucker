
$("#editBtn").click(function(){
    $("#editComment").toggleClass("d-none");
    $("#comment").toggleClass("d-none");
});
$("#sendMessageButton").click(function(){
    $("#editComment").toggleClass("d-none");
    $("#comment").toggleClass("d-none");
})

$("#editTruckBtn").click(function(){
    $("#editTruck").toggleClass("d-none");
    $("#truckDes").toggleClass("d-none");
});



$("#truckText").on("keyup input",function(){
    
    $(this).css("height","auto").css("height",this.scrollHeight+(this.offsetHeight-this.clientHeight));
});