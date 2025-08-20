import HourslyInfo from "./HourslyInfo";

export default function CityInfo({ type }) {
  return (
    <section>
      {type &&
        (type.type === "hourly" ? (
          <HourslyInfo city={type.city} />
        ) : (
          <p>weekly</p>
        ))}
    </section>
  );
}
