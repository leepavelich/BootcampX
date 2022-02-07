SELECT day, COUNT(*) AS total_assignments
  FROM assignments
  GROUP BY day
  HAVINg COUNT(*) >= 10
  ORDER BY day;