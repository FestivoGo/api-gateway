$("#side-superadmin").addClass("sidelist-selected")

$("#button-selesai").click(function(){
    $("#popup").removeClass("hidden")
    $(".delete-popup").removeClass("hidden")
})
$("#confirm-popup button").click(function(){
    window.location = "/festivo/superadmin"
})

$.get("/api/v1/schools", async (schoolData) => {
  schoolData.forEach(school => {
    $("#superadmin-school-select").append(`<option value="${school.school_id}">${school.school_name}</option>`)
  })
});

$("#form-admin-create").on("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    formData.append("role", "super_admin")
  
    $.ajax({
      url: "/api/v1/superadmin",
      type: "POST",
      data: formData,
      contentType: false,
      enctype: "multipart/form-data",
      processData: false,
      success: function (response) {
        if (response.status_code == 201) {
          $(".delete-popup").addClass("hidden")
          $("#confirm-popup").removeClass("hidden")
        }
      },
      error: function (data, status, error) {
        const ErrorMessage = `<div id="ErrorMessage" class="bg-red-500/80 fixed top-8 left-1/2 -translate-x-1/2 min-w-[400px] text-center py-1.5 rounded-lg border border-red-900 text-[#000] text-sm z-10">${status}: ${data.responseJSON.datas.error}</div>`
        $("body").prepend(ErrorMessage)
        $("#ErrorMessage")
          .delay(3000)
          .fadeOut("slow", function () {
            $(this).remove();
          });
      },
    });
  });