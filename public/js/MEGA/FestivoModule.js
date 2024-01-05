$("#side-module").addClass("sidelist-selected")

$.get("/api/v1/modules", async (data) => {
    console.log(data);
  $("#bg-nothing").remove()
  $("#table-module").removeClass("hidden")
  $("#table-module").DataTable({
    data: data,
    columns: [
      {
        data: null,
        width:"5%",
        render: function (data, type, row, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        },
      },
      { data: "module_name" },
      {
        data: "unique_id",
        width:"5%",
        render: function (data, type) {
          return `<a href="/festivo/modules/${data}" class="edit-siswa"><i class="uil uil-edit text-main"></i></a>`;
        },
      },
    ],
  });
});