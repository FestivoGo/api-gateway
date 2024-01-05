$("#side-superadmin").addClass("sidelist-selected")

$.get(`/api/v1/admins`, function (admins) {
    $("#bg-nothing").remove()
    $("#table-admin").removeClass("hidden")
    $("#table-admin").DataTable({
      ajax: {
        url: "/api/v1/admins",
        dataSrc: function (response) {
          return response.datas.filter((res) => {
            return res.role == "super_admin";
          });
        },
      },
      columns: [
        {
          data: null,
          width:"5%",
          render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          },
        },
        { data: "username"},
        { data: "nuptk"},
        { data: "school_id"},
        { data: "school_name"},
        {
          data: "unique_id",
          width:"5%",
          render: function (data, type) {
            return `<a href="/festivo/superadmin/${data}" class="edit-siswa"><i class="uil uil-edit text-main"></i></a>`;
          },
        },
      ],
    });
});