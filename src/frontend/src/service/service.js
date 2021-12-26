export const validateTextField = (field) => {
    if (field.length === 0 || /^[a-zA-Z]+$/.test(field) === false) {
        return true;
    }
    return false;
}

export const validateLoginAndPasswordField = (field) => {
    return field.length === 0 ? true : false;
}

export const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

export const postWithoutData = async (url) => {
    const res = await fetch(url, {
        method: "POST",
    });
    return await res.json();
};

export const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw prompt(new Error(`Could not fetch ${url}, status: ${res.status}`));
    }

    return await res.json();
};

export const deleteData = async (url) => {
    const res = await fetch(url, {
        method: 'DELETE',
    });

    return await res.json();
};

export const getDayName = (date) => {
    const days = ['Niedziela ', 'Poniedziałek ', 'Wtorek ', 'Środa ', 'Czwartek ', 'Piątek ', 'Sobota'];
    const d = new Date(date);
    return days[d.getDay()];
}

export const compare = ( a, b ) => {
    if ( a.category < b.category ) {
      return -1;
    }
    if ( a.category > b.category ){
      return 1;
    }
    return 0;
}