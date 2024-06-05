import React from "react";

export default function Error404() {
  return (
    <div class="content-wrapper">
      <section class="content">
        <div class="error-page">
          <h2 class="headline text-warning"> 404</h2>

          <div class="error-content">
            <h3>
              <i class="fas fa-exclamation-triangle text-warning"></i> Oops!
              Pagina no encontrada.
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}
