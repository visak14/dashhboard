import { HiOutlineSearch } from "react-icons/hi";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { adminState } from "../store/atoms/admin.js";
import { adminEmailState } from "../store/selectors/adminEmail.js";
import { useNavigate } from "react-router-dom";
import Avatar from 'react-avatar';

export default function Header() {
  const navigate = useNavigate();
  const adminEmail = useRecoilValue(adminEmailState);
  const setAdmin = useSetRecoilState(adminState);

  if (adminEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          className=""
          onClick={() => {
            navigate("/");
          }}
        >
          <div className='relative'>
            <HiOutlineSearch fontSize={20} className='text-gray-400 absolute top-1/2 -translate-y-1/2 left-3' />
            <input
              type='text'
              placeholder='search...'
              className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-md pr-4 pl-11 mb-2'
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 10, display: "flex", alignItems: "center" }}>
            <Avatar name={adminEmail} size="35" round={true} style={{ marginRight: 10 }} />
            <button
              onClick={() => {
                localStorage.setItem("token", null);
                setAdmin({
                  isLoad: false,
                  adminEmail: null,
                });
                navigate("/");
              }}
              style={{
                backgroundColor: "black", 
                color: "white",              
                padding: "5px 10px",       
                border: "none",             
                borderRadius: "5px",         
                cursor: "pointer",           
                transition: "background-color 0.3s", 
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"} 
              onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}  
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div></div>
    )
  }
}
