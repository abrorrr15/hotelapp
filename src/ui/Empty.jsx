function Empty({ resource, resourceName }) {
  return <p>No {resource || resourceName} could be found.</p>;
}

export default Empty;
