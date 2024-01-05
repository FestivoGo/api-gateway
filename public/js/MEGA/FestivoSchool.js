$("#side-sekolah").addClass("sidelist-selected")

$.get("/api/v1/schools", async (data) => {
  $("#bg-nothing").remove()
  $("#table-sekolah").removeClass("hidden")
  $("#table-sekolah").DataTable({
    data: data,
    columns: [
      {
        data: null,
        width:"5%",
        render: function (data, type, row, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        },
      },
      { data: "school_id" },
      { data: "school_name" },
      {
        data: "unique_id",
        width:"5%",
        render: function (data, type) {
          return `<a href="/festivo/schools/${data}" class="edit-siswa"><i class="uil uil-edit text-main"></i></a>`;
        },
      },
    ],
  });
});