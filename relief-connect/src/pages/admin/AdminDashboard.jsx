import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row">

        {/* Create Drive */}
        <div className="col-md-4">
          <div className="card p-4 shadow text-center">
            <h5>Create Donation Drive</h5>
            <p className="text-muted">
              Start a new relief or emergency campaign.
            </p>

            <button
              className="btn btn-primary mt-2"
              onClick={() => navigate("/create-drive")}
            >
              Create Drive
            </button>
          </div>
        </div>

        {/* View Donations */}
        <div className="col-md-4">
          <div className="card p-4 shadow text-center">
            <h5>View All Donations</h5>
            <p className="text-muted">
              Approve, reject or mark deliveries.
            </p>

            <button
              className="btn btn-success mt-2"
              onClick={() => navigate("/admin-donations")}
            >
              View Donations
            </button>
          </div>
        </div>

        {/* Reports */}
        <div className="col-md-4">
          <div className="card p-4 shadow text-center">
            <h5>Reports & Transparency</h5>
            <p className="text-muted">
              View donation statistics and summaries.
            </p>

            <button
              className="btn btn-warning mt-2"
              onClick={() => navigate("/admin-reports")}
            >
              View Reports
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;