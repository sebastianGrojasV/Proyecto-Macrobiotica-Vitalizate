namespace Abstracciones.Modelos {
    public class HistorialProductoBase {
        public Guid product_id { get; set; }
        public string action { get; set; }
        public string description { get; set; }
        public string old_values { get; set; }
        public string new_values { get; set; }
        public DateTimeOffset created_at { get; set; }
    }

    public class HistorialProductoResponse : HistorialProductoBase {
        public Guid id { get; set; }
    }
}