declare interface WeeklyInsights {
  numberOfWeeklyAppointment: number | 0;
  weeklyCountsByDay: CountsByDay[];
  weeklyServicePopularity: ServicePopularity[];
  weeklyStatusCount: StatusCount[];
  averageAppointmentsPerWeek: number;
  totalUsers: number;
  newUserCount: number;
  startDate: string;
  endDate: string;
}

declare interface MonthlyInsights {
  numberOfMonthlyAppointments: number | 0;
  monthlyServicePopularity: ServicePopularity[];
  monthlyCountsByDay: CountsByDay[];
  monthlyStatusCount: StatusCount[];
  averageAppointmentsPerMonth: number;
  totalUsers: number;
  newUserCount: number;
  startDate: string;
  endDate: string;
}

declare interface CountsByDay {
  date: string;
  count: number;
}

declare interface ServicePopularity {
  serviceType: string;
  count: number;
}

declare interface StatusCount {
  status: string;
  count: number;
}
