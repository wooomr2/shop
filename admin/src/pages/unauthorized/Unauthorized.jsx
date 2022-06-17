import { useNavigate } from "react-router-dom";

function UnAuthorized() {
  const navigate = useNavigate();

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="flexGrow">
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </section>
  );
}

export default UnAuthorized;
