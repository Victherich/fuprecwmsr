
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Context } from "./Context";

function AdminEditControl() {
  const [allowEdit, setAllowEdit] = useState(false);
  const {api_url}=useContext(Context);

  useEffect(() => {
    axios
      .get(`${api_url}/get_edit_setting.php`)
      .then((res) => {
        if (res.data.success) setAllowEdit(res.data.allow_edit);
      });
  }, []);

  const handleToggle = () => {
    const newValue = !allowEdit;

    axios
      .post(`${api_url}/update_edit_setting.php`, {
        allow_edit: newValue,
      })
      .then((res) => {
        if (res.data.success) {
          setAllowEdit(newValue);
          Swal.fire(
            "Updated",
            `Student edit feature is now ${newValue ? "enabled" : "disabled"}.`,
            "success"
          );
        } else {
          Swal.fire("Error", "Failed to update setting", "error");
        }
      });
  };

  return (
    <div className="admin-control">
      <h3 style={{color:"green"}}>Student Edit Control</h3>
      <p>Toggle to enable or disable students’ ability to edit their Names.</p>
      <label>
        <input
          type="checkbox"
          checked={allowEdit}
          onChange={handleToggle}
        />{" "}
        Allow Students to Edit their Name
      </label>
    </div>
  );
}

export default AdminEditControl;
