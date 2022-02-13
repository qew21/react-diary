import decodeJwt from 'jwt-decode';

/**
 * Login to backend and store JSON web token on success
 *
 * @param email
 * @param password
 * @returns JSON data containing access token on success
 * @throws Error on http errors or failed attempts
 */
export const create_diary = async (email: string, note: string, date: string) => {
  // Assert email or password is not empty
  if (!email  || !(email.length > 0) || !note || !(note.length > 0)) {
    throw new Error('Email or password was not provided');
  }
  const times = {
    sleep: localStorage.sleep,
    exercise: localStorage.exercise,
    study: localStorage.study,
    entertainment: localStorage.entertainment,
    meal: localStorage.meal,
    other: localStorage.other,
  };
  const formData ={"email":email, "note":note, "date":date, "times":JSON.stringify(times) };
  const request = new Request('/api/diary', {
    method: 'POST',
    body: JSON.stringify(
        formData,
      ),
      headers: {
        "content-type": "application/json",
        'token':localStorage.token,
      }

  });

  const response = await fetch(request);

  if (response.status === 500) {
    throw new Error('Internal server error');
  }

  const data = await response.json();

  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail;
    }
    throw data;
  }

  return data;
};


export const get_diary = async (email: string, date: string) => {
    // Assert email or password is not empty
    if (!(email.length > 0) || !(date.length > 0)) {
      throw new Error('Email or password was not provided');
    }
    var url = "/api/diary/"+email+"/"+date;
    const request = new Request(url, {
      method: 'GET', headers:{'token':localStorage.token}
    });
  
    const response = await fetch(request);
  
    if (response.status === 500) {
      throw new Error('Internal server error');
    }
  
    const data = await response.json();
  
    if (response.status > 400 && response.status < 500) {
      if (data.detail) {
        throw data.detail;
      }
      throw data;
    }
  
    return data;
  };

