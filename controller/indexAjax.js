// --------------- Lấy danh sách nhân viên từ server --------------------//

function layDanhSachNhanVienApi () {
    var promise = axios ({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET',
        responseType: 'json'
    })

    //Xử lý thành công
    promise.then(function(result){
        console.log('result',result.data);
        //Sau khi lấy dữ liệu thành công hiện ra giao diện bằng DOM
        renderTableNhanVien(result.data);
    })

    promise.catch(function(error){
        console.log('error',error);
    })
}

layDanhSachNhanVienApi ();
function renderTableNhanVien (arrNV){
    var content = '';
    for (index = 0; index < arrNV.length; index++) {
        var nhanVien = new NhanVien();
        //Lấy dữ liệu từ input truyền vào biến nhanVien
        nhanVien.maNhanVien = arrNV[index].maNhanVien;
        nhanVien.tenNhanVien = arrNV[index].tenNhanVien;
        nhanVien.chucVu = arrNV[index].chucVu;
        nhanVien.heSoChucVu = arrNV[index].heSoChucVu;
        nhanVien.luongCoBan = arrNV[index].luongCoBan;
        nhanVien.soGioLamTrongThang = arrNV[index].soGioLamTrongThang;

        var trNhanVien = `
            <tr>
                <td>${nhanVien.maNhanVien}</td>
                <td>${nhanVien.tenNhanVien}</td>
                <td>${nhanVien.chucVu}</td>
                <td>${nhanVien.luongCoBan}</td>
                <td>${nhanVien.tongLuong()}</td>
                <td>${nhanVien.soGioLamTrongThang}</td>
                <td>${nhanVien.xepLoaiNhanVien()}</td>
                <td>
                    <button onclick="xoaNhanVien('${nhanVien.maNhanVien}')" class="btn btn-danger">Xóa</button>
                </td>
                <td>
                    <button onclick="chinhSua('${nhanVien.maNhanVien}')" class="ml-2 btn btn-primary">Chỉnh sửa</button>
                </td>
            </tr>
        `;
        content = content + trNhanVien;
    };
    //Dom đến tbody trên giao diện để gán innerHTML
    document.querySelector('#tblNhanVien').innerHTML = content;
}

//-------------------- POST (đưa dữ liệu người dùng nhập về server) ----------//


document.querySelector('#themNhanVien').onclick = function (){
    var nhanVien = new NhanVien();
    //Lấy dữ liệu từ input truyền vào biến nhanVien
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLam').value;
    //Lấy giá trị innerHTML của thẻ option được chọn  từ thẻ select
    var slChucVu = document.querySelector('#chucVu');
    var optChucVu = slChucVu.selectedIndex;
    nhanVien.chucVu = slChucVu[optChucVu].innerHTML;

    //---------------------- Validation -------------------//
    var testInput = new Validation();
    //(1) Kiểm tra rỗng
    var valid = true;
    valid &= 
    testInput.required(nhanVien.maNhanVien, 
        '#error_required_maNhanVien', 'Mã nhân viên') &
    testInput.required(nhanVien.tenNhanVien, 
        '#error_required_tenNhanVien', 'Tên nhân viên') &
    testInput.required(nhanVien.luongCoBan, 
        '#error_required_luongCoBan', 'Lương cơ bản') &
    testInput.required(nhanVien.soGioLamTrongThang, 
        '#error_required_soGioLam', 'Số giờ làm trong tháng');

    // (2) Kiểm tra định dạng dữ liệu
    // (2.1) Kiểm tra ký tự 
    valid &= testInput.allLetter(nhanVien.tenNhanVien,
        '#error_allLetter_tenNhanVien', 'Tên nhân viên');
    // (2.2) Kiểm tra định dạng số
    valid &= 
    testInput.allNumber(nhanVien.luongCoBan, 
        '#error_allNumber_luongCoBan', 'Lương cơ bản') &
    testInput.allNumber(nhanVien.soGioLamTrongThang, 
        '#error_allNumber_soGioLam', 'Số giờ làm trong tháng');
    
    // (2.3) Kiểm tra độ dài
    valid &=
    testInput.minMaxLength(nhanVien.maNhanVien,
        '#error_min_max_length_maNhanVien',4,6, 'Mã nhân viên');
    // (2.4) Kiểm tra giá trị
    valid &=
    testInput.minMaxValue(nhanVien.luongCoBan,
        '#error_min_max_value_luongCoBan',1000000,20000000,'Lương cơ bản' ) &
    testInput.minMaxValue(nhanVien.soGioLamTrongThang,
        '#error_min_max_value_soGioLam', 50, 150, 'Số giờ làm trong tháng');
    

    if (!valid) {
        return;
    }

    //--------------------------------------------------------------------------------//

    //Gừi dữ liệu về server bằng ajax
    var promise = axios ({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
        method: 'POST',
        data: nhanVien
    })

    //Hàm xử lý thành công
    promise.then(function(result){
        console.log('result', result.data);
        //Gọi hàm lấy danh sách nhanVien về lần nữa
        layDanhSachNhanVienApi()
    })

    promise.catch(function(error){
        console.log('error', error.response.data);
    })
}

//--------------- DELETE -------------------//

function xoaNhanVien (maNhanVien) {
    var promise = axios ({
        url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
        method: 'DELETE'
    })

    promise.then(function(result){
        console.log('result', result.data);
        layDanhSachNhanVienApi()
    })

    promise.catch(function(error){
        console.log('error', error);
    })
}

//------------ GET (Chỉnh sửa thông tin) -------------------//

function chinhSua(maNhanVien){

    //Khóa themNhanVien và maNhanVien khi tương tác nút chinhSua
    document.querySelector('#maNhanVien').disabled = true;
    document.querySelector('#themNhanVien').disabled = true;
    document.querySelector('#capNhatNhanVien').disabled = false;

    var promise = axios ({
        url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
        method: 'GET'
    })

    promise.then(function(result){
        var nhanVien = result.data;
        //Đưa các giá trị dữ liệu lấy về lên các control input phía trên
        document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;
        document.querySelector('#chucVu').value = nhanVien.heSoChucVu;
        document.querySelector('#soGioLam').value = nhanVien.soGioLamTrongThang;
        document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;
    })

    promise.catch(function(error){
        console.log('error', error.response.data)
    })  
}

//------------- PUT (Cập nhật Nhân Viên) -----------//

document.querySelector('#capNhatNhanVien').onclick = function(){
    var updateNhanVien = new NhanVien();
    updateNhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    updateNhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    updateNhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    updateNhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    updateNhanVien.soGioLamTrongThang = document.querySelector('#soGioLam').value;
    //Lấy giá trị innerHTML của thẻ option được chọn  từ thẻ select
    var slChucVu = document.querySelector('#chucVu');
    var optChucVu = slChucVu.selectedIndex;
    updateNhanVien.chucVu = slChucVu[optChucVu].innerHTML;

    //---------------------- Validation -------------------//
    var testInput = new Validation();
    //(1) Kiểm tra rỗng
    var valid = true;
    valid &= 
    testInput.required(updateNhanVien.maNhanVien, 
        '#error_required_maNhanVien', 'Mã nhân viên') &
    testInput.required(updateNhanVien.tenNhanVien, 
        '#error_required_tenNhanVien', 'Tên nhân viên') &
    testInput.required(updateNhanVien.luongCoBan, 
        '#error_required_luongCoBan', 'Lương cơ bản') &
    testInput.required(updateNhanVien.soGioLamTrongThang, 
        '#error_required_soGioLam', 'Số giờ làm trong tháng');

    // (2) Kiểm tra định dạng dữ liệu
    // (2.1) Kiểm tra ký tự 
    valid &= testInput.allLetter(updateNhanVien.tenNhanVien,
        '#error_allLetter_tenNhanVien', 'Tên nhân viên');
    // (2.2) Kiểm tra định dạng số
    valid &= 
    testInput.allNumber(updateNhanVien.luongCoBan, 
        '#error_allNumber_luongCoBan', 'Lương cơ bản') &
    testInput.allNumber(updateNhanVien.soGioLamTrongThang, 
        '#error_allNumber_soGioLam', 'Số giờ làm trong tháng');
    
    // (2.3) Kiểm tra độ dài
    valid &=
    testInput.minMaxLength(updateNhanVien.maNhanVien,
        '#error_min_max_length_maNhanVien',4,6, 'Mã nhân viên');
    // (2.4) Kiểm tra giá trị
    valid &=
    testInput.minMaxValue(updateNhanVien.luongCoBan,
        '#error_min_max_value_luongCoBan',1000000,20000000,'Lương cơ bản' ) &
    testInput.minMaxValue(updateNhanVien.soGioLamTrongThang,
        '#error_min_max_value_soGioLam', 50, 150, 'Số giờ làm trong tháng');
    

    if (!valid) {
        return;
    }

    //--------------------------------------------------------------------------------//

    //Mở khóa nút themNhanVien và maNhanVien đồng thời khóa capNhatNhanVien
    document.querySelector('#maNhanVien').disabled = false;
    document.querySelector('#themNhanVien').disabled = false;
    document.querySelector('#capNhatNhanVien').disabled = true;

    var promise = axios ({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${updateNhanVien.maNhanVien}`,
        method: 'PUT',
        data: updateNhanVien
    })

    promise.then(function(result){
        console.log(result.data);
        //Sau khi thành công request về api lấy dữ liệu mới về 
        layDanhSachNhanVienApi();
    })

    promise.catch(function(error){
        console.log(error.response.data)
    })

}
