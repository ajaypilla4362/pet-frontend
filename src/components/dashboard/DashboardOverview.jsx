import SummaryCards from "./SummaryCards";
import ActivityChart from "./ActivityChart";
import UpcomingAppointments from "./UpcomingAppointments";
import PetsOverview from "./PetsOverview";
import VaccinationSchedule from "./VaccinationSchedule";

function DashboardOverview({ pets }) {
  const totalPets = pets.length;

  return (
    <div className="dashboard-overview">
      <SummaryCards totalPets={totalPets} />
      <ActivityChart />
      <UpcomingAppointments />
      <PetsOverview pets={pets} />
      <VaccinationSchedule />
    </div>
  );
}

export default DashboardOverview;
