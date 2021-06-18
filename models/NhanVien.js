
function NhanVien(){
    this.maNhanVien = '';
    this.tenNhanVien = '';
    this.chucVu = '';
    this.heSoChucVu = '';
    this.luongCoBan = '';
    this.soGioLamTrongThang = '';
    this.tongLuong = function (){
        return(Number(this.luongCoBan) * Number(this.heSoChucVu))
    }
    this.xepLoaiNhanVien = function (){
        if (this.soGioLamTrongThang > 100) {
             return 'Nhân viên xuất sắc';
        }else if (this.soGioLamTrongThang >=90 && this.soGioLamTrongThang < 100 ) {
             return 'Nhân viên giỏi';
        }else if (this.soGioLamTrongThang < 100 && this.soGioLamTrongThang >= 50) {
            return 'Bình thường';
        }else {
            return 'Không hợp lệ';
        }
    }
}