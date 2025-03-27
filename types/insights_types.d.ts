declare interface WeeklyInsights {
  numberOfWeeklyAppointment: number | 0;
  weeklyCountsByDay: WeeklyCountsByDay[];
  weeklyServicePopularity: WeeklyServicePopularity;
  weeklyStatusCount: WeeklyStatusCount;
  averageAppointmentsPerWeek: number;
  totalUsers: number;
  newUserCount: number;
}

declare interface WeeklyCountsByDay {
  date: string;
  count: number;
}

declare interface WeeklyServicePopularity {
  serviceType: string;
  count: number;
}

declare interface WeeklyStatusCount {
  status: string;
  count: number;
}
