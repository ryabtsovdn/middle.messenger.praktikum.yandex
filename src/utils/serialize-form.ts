export default function (form: HTMLFormElement): AnyObject {
  const obj: AnyObject = {};
  const formData = new FormData(form);
  for (const [key, value] of formData.entries()) {
    obj[key] = value;
  }
  return obj;
}
