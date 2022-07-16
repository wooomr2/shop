import RefreshIcon from "@mui/icons-material/Refresh";
import { useEffect } from "react";
import "./loading.scss";

function Loading() {
  let progress = 0;

  useEffect(() => {
    const loadingIcon = document.querySelector(".icon");

    if (loadingIcon) {
      const loading = setInterval(() => {
        ++progress;
        loadingIcon.style.transform = `rotate(${progress}deg)`;
      }, 10);

      return () => clearInterval(loading);
    }
  }, []);

  return (
    <div className="loadingModal">
      <div className="loadingModal-content">
        <div className="loadingModal-content-icon">
          <RefreshIcon className="icon" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
