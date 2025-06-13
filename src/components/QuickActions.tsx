import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, Pill, FileText, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Log Vitals",
      description: "Record your vital signs",
      icon: <Activity className="h-6 w-6" />,
      onClick: () => navigate("/vitals/log"),
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Schedule Appointment",
      description: "Book a new appointment",
      icon: <Calendar className="h-6 w-6" />,
      onClick: () => navigate("/appointments/new"),
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Add Medication",
      description: "Update your medication list",
      icon: <Pill className="h-6 w-6" />,
      onClick: () => navigate("/medications/add"),
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Submit Symptoms",
      description: "Report new symptoms",
      icon: <FileText className="h-6 w-6" />,
      onClick: () => navigate("/submit-symptoms"),
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <Card>
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and actions</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 flex items-center gap-2 bg-red-500 text-white"
          onClick={() => navigate("/quick-actions/history")}
        >
          <History className="h-4 w-4" />
          <span>History</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className={`h-auto p-4 flex flex-col items-start space-y-2 ${action.color}`}
              onClick={action.onClick}
            >
              {action.icon}
              <div className="text-left">
                <div className="font-semibold">{action.title}</div>
                <div className="text-sm opacity-70">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions; 