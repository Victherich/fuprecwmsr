import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AdminResultControl() {
  const [allowResult, setAllowResult] = useState(false);

  useEffect(() => {
    axios
      .get("https://www.cwmsrfupre.com.ng/base/get_result_setting.php")
      .then((res) => {
        if (res.data.success) setAllowResult(res.data.allow_result);
      });
  }, []);

  const handleToggle = () => {
    const newValue = !allowResult;

    axios
      .post("https://www.cwmsrfupre.com.ng/base/update_result_setting.php", {
        allow_result: newValue,
      })
      .then((res) => {
        if (res.data.success) {
          setAllowResult(newValue);
          Swal.fire(
            "Updated",
            `Result access is now ${newValue ? "enabled" : "disabled"}.`,
            "success"
          );
        } else {
          Swal.fire("Error", "Failed to update setting", "error");
        }
      });
  };

  return (
    <div className="admin-control">
      <h3 style={{ color: "green" }}>Result Control</h3>
      <p>Toggle to enable or disable students’ ability to view results.</p>
      <label>
        <input
          type="checkbox"
          checked={allowResult}
          onChange={handleToggle}
        />{" "}
        Allow Students to Access Results
      </label>
    </div>
  );
}

export default AdminResultControl;