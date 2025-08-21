import HourslyInfo from "./HourslyInfo/HourslyInfo";
import WeeklyInfo from "./WeeklyInfo/WeeklyInfo";

export default function CityInfo({ type }) {
  return (
    <>
      {type &&
        (type.type === "hourly" ? (
          <HourslyInfo city={type.city} />
        ) : (
          <WeeklyInfo city={type.city}></WeeklyInfo>
        ))}
    </>
  );
}
