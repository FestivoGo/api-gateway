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
$("#button-cancel").click(function(){
  $("#popup-module").addClass("hidden")
  $("#popup-activate").addClass("hidden")
})
$("#confirm-popup button").click(function(){
    window.location = "/festivo/schools"
})


$("#school-status").change(function(){
  $(this).val($(this).is(":checked"))
  const form_update = document.getElementById("form-update-school-status");
  const formData = new FormData(form_update)
  if($(this).val() == "false") formData.append("school_active", false)
  
  $.ajax({
      url: `/api/v1/schools/${SCHOOL_ID}`,
      type: "DELETE",
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      encrypt: "multipart/form-data",
      processData: false,
      success: (response) => {
          if(response.status_code == 200){
              location.reload()
          }
      },
      error: function (request, status, error) {
          alert("Error!")
      },
  });
})




$.get(`/api/v1/schools/${SCHOOL_ID}`, async (data, status) => {
    let SCHOOL_DATA = data;
    if (status == "success" && data) {
      $("input[name=school_name]").val(data.school_name);
      if(SCHOOL_DATA.school_active){
        $("#school-status").prop("checked", true)
        $("#active-school-status").removeClass("text-red-500").addClass("text-green-500").text("ACTIVE")
      }
    }

    $("#module-assign").empty()
    SCHOOL_DATA.modules.forEach(module => {
      $("#module-assign").append(addModule(module))
    })


    $(".button-activate").click(function(){
      STATUS_ID = $(this).parent().find(".status-id").text()
      $("#popup-module").removeClass("hidden")
      $("#popup-activate").removeClass("hidden")
      $("input[name=tanggal_mulai]").val(getTodayDate())
      
      $("input[name=tanggal_mulai], input[name=tanggal_berakhir]").change(function(){
        const TANGGAL_MULAI = $("input[name=tanggal_mulai]").val()
        const TANGGAL_BERAKHIR = $("input[name=tanggal_berakhir]").val()
        
        if(TANGGAL_BERAKHIR && TANGGAL_MULAI){
          $("#popup-total-durasi").text(hitungSelisihTanggal(TANGGAL_MULAI, TANGGAL_BERAKHIR))
          $("#form-activate-module").on("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(this);
          
            $.ajax({
              url: `/api/v1/schools/modules/${STATUS_ID}`,
              type: "PUT",
              data: formData,
              contentType: false,
              enctype: "multipart/form-data",
              processData: false,
              success: function (response) {
                if (response.status_code == 200) {
                  window.location = `/festivo/schools/${SCHOOL_ID}`
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
        }
      })
    })
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


$("#form-school-delete").on("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  $.ajax({
    url: `/api/v1/schools/${SCHOOL_ID}`,
    type: "DELETE",
    data: formData,
    contentType: false,
    enctype: "multipart/form-data",
    processData: false,
    success: function (response) {
      if (response.status_code == 200) {
        window.location = "/festivo/schools"
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



function addModule(module){
  return `
  <div class="module p-4 rounded-lg bg-white divide-y divide-main/20 min-w-[290px]">
    <div class="mb-3">
      <p class="w-max ${module.status.subscribed ? "bg-[#44A47F]/10 text-main" : "bg-[#FC4545]/10 text-red-500"} px-3 py-1 rounded-2xl ms-auto text-sm">${module.status.subscribed ? "ACTIVE" : "INACTIVE"}</p>
      <p class="font-bold text-main text-2xl">${module.module_name}</p>
      <div class="flex gap-10 mt-4">
        <div class="text-main text-sm">
          <p>Tanggal Mulai</p>
          <p class="font-bold">${module.status.tanggal_mulai ? formatTanggal(module.status.tanggal_mulai) : '-'}</p>
        </div>
        <div class="text-main text-sm">
          <p>Tanggal Berakhir</p>
          <p class="font-bold">${module.status.tanggal_berakhir ? formatTanggal(module.status.tanggal_berakhir) : '-'}</p>
        </div>
      </div>
    </div>
    <div class="pt-4">
      <p class="status-id hidden">${module.status.unique_id}</p>
      <div class="text-main text-sm">
        <p>Total Durasi</p>
        <p>${module.status.tanggal_berakhir && module.status.tanggal_mulai ? hitungSelisihTanggal(module.status.tanggal_mulai, module.status.tanggal_berakhir) : "-"}</p>
      </div>
      <div class="text-main text-sm mt-3">
        <p>Sisa Durasi</p>
        <p class="text-red-500">${module.status.tanggal_berakhir && module.status.tanggal_mulai ? hitungSelisihTanggal(getTodayDate(), module.status.tanggal_berakhir) : "-"}</p>
      </div>
      <button type="button" class="button-activate py-2.5 bg-[#E8F4EF] text-[#358F6C] font-bold flex justify-center mt-6 w-full rounded-2xl">Activate</button>
    </div>
  </div>
  `
}

function hitungSelisihTanggal(tanggalMulai, tanggalBerakhir) {
  const dateMulai = new Date(tanggalMulai);
  const dateBerakhir = new Date(tanggalBerakhir);

  if (dateBerakhir < dateMulai) {
    return "0 BULAN, 0 HARI";
  }

  const selisihMillis = Math.abs(dateBerakhir - dateMulai);
  const selisihHari = Math.floor(selisihMillis / (1000 * 60 * 60 * 24));

  const bulan = Math.floor(selisihHari / 30);
  const hari = selisihHari % 30;

  return `${bulan} BULAN, ${hari} HARI`;
}

function formatTanggal(inputTanggal) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(inputTanggal);
  return date.toLocaleDateString('id-ID', options);
}

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}