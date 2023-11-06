import React, { useContext, useState } from 'react'
import './UserProfile.scss'
import UserContext from '../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImgModal from '../../component/ImgModal/ImgModal';



export default function UserProfile() {



  const { user, setUser, updateUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ ...user });

  // Khai báo state để lưu trạng thái của việc validate form
  const [formErrors, setFormErrors] = useState({});
  console.log(formData);
  const backgroundImageStyle = {
    backgroundImage: `url(${user.imageUrl})`,
    /* Các thuộc tính khác cho phần tử */
    width: '48px', // Đặt kích thước cho khối div
    height: '48px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#f5f5f5',
    borderRadius: '50%',
    cursor: 'pointer'
  };
  const imgUser = {
    backgroundImage: `url(${formData.imageUrl})`,
    /* Các thuộc tính khác cho phần tử */
    width: '100px', // Đặt kích thước cho khối div
    height: '100px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#f5f5f5',
    borderRadius: '50%',
    cursor: 'pointer'
  };

  //style error 
  const errorStyle = {
    color: 'red',
    fontSize: '12px',
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('name on change:', value, name, formData);
    setFormData({ ...formData, [name]: value || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('đã vào');
    try {
      if (validateForm()) {
        const res = await updateUser(user.id, formData);
        console.log(res);
        if (res.status === 200) {
          setUser({
            ...user,
            username: formData.username,
            dateOfBirth: formData.dateOfBirth,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            sex: formData.sex,
            imageUrl: formData.imageUrl
          }
          )
          localStorage.setItem("tokenuser", JSON.stringify(formData));
          toast.success('Cập nhật thành công');
        }
      }

    } catch (error) {
      console.error('Lỗi:', error);
      toast.error('Có lỗi xảy ra khi cập nhật thông tin');
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Kiểm tra trường username
    if (!formData.username.trim()) {
      errors.username = 'Tên Đăng Nhập không được để trống';
      isValid = false;
      toast.error('Tên Đăng Nhập không được để trống');
    }
    // Kiểm tra trường name
    if (!formData.name.trim()) {
      errors.name = 'Tên không được để trống';
      isValid = false;
      toast.error('Tên không được để trống');
    }

    // Kiểm tra trường email
    if (!formData.email.trim()) {
      errors.email = 'Email không được để trống';
      isValid = false;
      toast.error('Email không được để trống');
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
      isValid = false;
      toast.error('Email không hợp lệ');
    }

    // Kiểm tra trường phone
    if (!formData.phone.trim()) {
      errors.phone = 'Số Điện Thoại không được để trống';
      isValid = false;
      toast.error('Số Điện Thoại không được để trống');
    } else if (!/^\d{10}$/i.test(formData.phone)) {
      errors.phone = 'Số Điện Thoại không hợp lệ';
      isValid = false;
      toast.error('Số Điện Thoại không hợp lệ');
    }

    // Kiểm tra trường dateOfBirth (thêm các quy tắc kiểm tra theo ý muốn)
    if (!formData.dateOfBirth.trim()) {
      errors.dateOfBirth = 'Ngày sinh không được để trống';
      isValid = false;
      toast.error('Ngày sinh không được để trống');
    }

    setFormErrors(errors);
    return isValid;
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveImg = (img) => {
    setFormData({
      ...formData,
      imageUrl: img
    });
    setOpen(false);
  }
  function maskEmail(email) {
    // Tách phần trước "@" và phần sau "@" của địa chỉ email
    const [localPart, domain] = email.split('@');
  
    // Lấy chiều dài của phần localPart
    const localPartLength = localPart.length;
  
    // Lấy 2 chữ cái đầu của phần localPart
    const firstThreeChars = localPart.substring(0, 2);
  
    // Tạo một chuỗi có chiều dài bằng phần localPart trừ 3 ký tự đầu và bao gồm toàn bộ ký tự "*"
    const maskedLocalPart = `${firstThreeChars}${'*'.repeat(localPartLength - 3)}`;
  
    // Kết hợp phần maskedLocalPart và domain để tạo địa chỉ email đã được che dấu
    const maskedEmail = `${maskedLocalPart}@${domain}`;
  
    return maskedEmail;
  }
  return (
    <div className='userprofile-container'>
      <div className='container d-flex'>
        <div className='userprofile-left '>
          <div className='userprofile-left-username-container d-flex'>
            <div className='userprofile-left-username'>
              <div className='shoppe_avatar-left' style={backgroundImageStyle}></div>
            </div>
            <div className='userprofile-right-username'>
              <div className='right-username'>{user.username}</div>
              <div className='link-fix-profile'>
                <a class="_78QHr1" href="/user/account/profile" style={{ color: '#888888', fontSize: '14px', lineHeight: '1.2' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}><path d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48" fill="#9B9B9B" fill-rule="evenodd"></path></svg>
                  Sửa hồ sơ
                </a>
              </div>
            </div>
          </div>
          <div className='userprofile-left-menu-container'>
            <div className='stardust-dropdown d-flex'>
              <div class="bfikuD"><img src="https://down-vn.img.susercontent.com/file/sg-11134004-7rbk0-lkqjzuixpfi95f" /></div>
              <div class="DlL0zX"><span class="adF7Xs">Ưu đãi dành riêng cho bạn</span></div>
            </div>
            <div className='stardust-dropdown d-flex'>
              <div class="bfikuD"><img src="https://down-vn.img.susercontent.com/file/sg-11134004-7rbk0-lkuzkqvizep4b0" /></div>
              <div class="DlL0zX"><span class="adF7Xs">9.9 Shopee Live Làm Đẹp</span></div>
            </div>
            <div className='stardust-dropdown d-flex'>
              <div class="bfikuD"><img src="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4" /></div>
              <div class="DlL0zX"><span class="adF7Xs">Tài khoản của tôi</span></div>
            </div>
            <div className='stardust-dropdown d-flex'>
              <div class="bfikuD"><img src="https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078" /></div>
              <div class="DlL0zX"><span class="adF7Xs">Đơn Mua</span></div>
            </div>
            <div className='stardust-dropdown d-flex'>
              <div class="bfikuD"><img src="https://down-vn.img.susercontent.com/file/e10a43b53ec8605f4829da5618e0717c" /></div>
              <div class="DlL0zX"><span class="adF7Xs">Thông báo</span></div>
            </div>
            <div className='stardust-dropdown d-flex'>
              <div class="bfikuD"><img src="https://down-vn.img.susercontent.com/file/84feaa363ce325071c0a66d3c9a88748" /></div>
              <div class="DlL0zX"><span class="adF7Xs">Kho Voucher</span></div>
            </div>
            <div className='stardust-dropdown d-flex'>
              <div class="bfikuD"><img src="https://down-vn.img.susercontent.com/file/a0ef4bd8e16e481b4253bd0eb563f784" /></div>
              <div class="DlL0zX"><span class="adF7Xs">Shopee Xu</span></div>
            </div>

          </div>
        </div>
        <div className='userprofile-right'>
          <div className='title-detail-profile'>
            <h1 className='SbCTde'>Hồ sơ của tôi</h1>
            <div class="zptdmA">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
          </div>
          <div className='content-detail-profile d-flex'>
            <div className='content-detail-profile-left'>
              <form onSubmit={handleSubmit}>
                <table className='table-detail'>
                  <tr>
                    <td className='title-content'>
                      <label>Tên Đăng Nhập</label>
                    </td>
                    <td className='input-content'>
                      <div className='text-input'>
                        <input type='text' value={formData.username} onChange={handleChange} name="username" />
                      </div>
                      <div class="bp2tsO">Tên Đăng nhập chỉ có thể thay đổi một lần.</div>
                      {/* Thông báo lỗi cho trường username */}
                      {formErrors.username && <div className="error-message" style={errorStyle}>{formErrors.username}</div>}
                    </td>
                  </tr>
                  <tr>
                    <td className='title-content'>
                      <label>Tên</label>
                    </td>
                    <td className='input-content'>
                      <div className='text-input'>
                        <input type='text' value={formData.name} onChange={handleChange} name="name" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='title-content'>
                      <label>Email</label>
                    </td>
                    <td className='input-content d-flex'>
                      <div class="email-input">{maskEmail(formData.email)}</div>
                      <button class="btn-change">Thay đổi</button>
                    </td>
                  </tr>
                  <tr>
                    <td className='title-content'>
                      <label>Số Điện Thoại</label>
                    </td>
                    <td className='input-content'>
                      <div className='text-input'>
                        <input type='text' value={formData.phone} onChange={handleChange} name="phone" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='title-content'>
                      <label>Giới Tính</label>
                    </td>
                    <td className='input-content'>
                      <input type="radio" id="nam" className="radio-input-sex" value="Nam" name='sex' checked={formData.sex === 'Nam'} onChange={handleChange} />
                      <label for="nam" className='label-sex'>Nam</label>
                      <input type="radio" id="nu" className="radio-input-sex" value="Nữ" name='sex' checked={formData.sex === 'Nữ'} onChange={handleChange} />
                      <label for="nu" className='label-sex'>Nữ</label>
                      <input type="radio" id="khac" className="radio-input-sex" value="Khác" name='sex' checked={formData.sex === 'Khác'} onChange={handleChange} />
                      <label for="khac" className='label-sex'>Khác</label>
                    </td>
                  </tr>
                  <tr>
                    <td className='title-content'>
                      <label>Ngày Sinh</label>
                    </td>
                    <td className='input-content'>
                      <div className='text-input'>
                        <input type='date' value={formData.dateOfBirth} onChange={handleChange} name='dateOfBirth' />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='title-content'>
                    </td>
                    <td className='input-content'>
                      <button type="submit" class="btn btn-solid-primary btn-save-detail" aria-disabled="false">Lưu</button>
                    </td>
                  </tr>
                </table>
              </form>
            </div>
            <div className='content-detail-profile-right'>
              <div className='img-user-container'>
                <div className='img-user-right' style={imgUser} onClick={() => handleClickOpen()}></div>
                <button type="button" class="btn btn-light btn--m btn--inline" onClick={() => handleClickOpen()}>Chọn ảnh</button>
                <ImgModal open={open} handleClose={handleClose} handleSaveImg={handleSaveImg} formData={formData} />
                <div class="L4SAGB">
                  <div class="SlaeTm">Dụng lượng file tối đa 1 MB</div>
                  <div class="SlaeTm">Định dạng:.JPEG, .PNG</div>
                </div>
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>

    </div>
  )
}
