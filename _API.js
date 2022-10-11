export const getData = () => (
  fetch('./_data/FakeData.json', {
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    }
  })
  .then(async response => {
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  })
)

export const getLabels = () => (
  fetch('./_data/FakeConfig.json', {
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    }
  })
  .then(async response => {
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  })
)