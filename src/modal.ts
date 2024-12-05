export class Modal {
  public static show(modalId: string, message?: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      if (message) {
        const messageElement = modal.querySelector('.modal-body p');
        if (messageElement) {
          messageElement.textContent = message;
        }
      }
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  public static hide(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  }
}
