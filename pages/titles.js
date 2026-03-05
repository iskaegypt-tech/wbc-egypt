import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Titles() {

  const [titles, setTitles] = useState([]);

  useEffect(() => {
    getTitles();
  }, []);

  async function getTitles() {

    const { data, error } = await supabase
      .from("titles")
      .select(`
        id,
        title_name,
        weight_class,
        fighters(full_name)
      `);

    if (error) {
      console.log(error);
    } else {
      setTitles(data);
    }
  }

  return (
    <div style={{padding:"40px"}}>

      <h1>WBC Muay Thai Egypt Champions</h1>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Champion</th>
            <th>Title</th>
            <th>Weight Class</th>
          </tr>
        </thead>

        <tbody>
          {titles.map((t) => (
            <tr key={t.id}>
              <td>{t.fighters?.full_name}</td>
              <td>{t.title_name}</td>
              <td>{t.weight_class}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}
