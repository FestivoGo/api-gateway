$("#side-sekolah").addClass("sidelist-selected")

let SCHOOL_ID = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
);

$("#button-selesai").click(function(){
    $("#popup").removeClass("hidden")
    $(".delete-popup").removeClass("hidden")
})
$("#button-batal").click(function(){
    $("#popup").addClass("hidden")
    $(".delete-popup").addClass("hidden")
})
$("#confirm-popup button").click(function(){
    window.location = "/festivo/schools"
})

$.get(`/api/v1/schools/${SCHOOL_ID}`, async (data, status) => {
    let SCHOOL_DATA = data;
    if (status == "success" && data) {
      $("input[name=school_name]").val(data.school_name);
    }


    $.get(`/api/v1/modules`, async (moduleDatas, status) => {
      if (status == "success" && moduleDatas.length !== 0) {
        $("#module-assign").html("");
        moduleDatas.forEach((data) => {
          $("#module-assign").append([
            `
            <div class="exam-assign flex items-center justify-between bg-main text-white rounded-lg px-4 py-2.5">
              <span for="${data.unique_id}">${data.module_name}</span>
              <input type="checkbox" name="ON" value="${data.unique_id}" id="${data.unique_id}" />
            </div>
            `,
          ]);
    
          $("#module-assign").on("change", `#${data.unique_id}`, function () {
            if (!$(`#${data.unique_id}`).is(":checked")) {
              $(this).html(`<input type="hidden" name="OFF" id="${data.unique_id}" value="${data.unique_id}" />`);
            } else {
              $(this).prop("name", "ON")
            }
          });
          // CHEKED
        });
    
        SCHOOL_DATA.modules.forEach((moduleMe) => {
          if(moduleMe.status.subscribed){
            $(`#${moduleMe.unique_id}`).prop("checked", true);
          }
        });
      }
    });
});

$("#form-school-edit").on("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
  
    $.ajax({
      url: `/api/v1/schools/${SCHOOL_ID}`,
      type: "PUT",
      data: formData,
      contentType: false,
      enctype: "multipart/form-data",
      processData: false,
      success: function (response) {
        if (response.status_code == 200) {
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