import React from 'react';
import '../styles/OffresTable.css';

function OffresTable({ offres, onEdit, onDelete }) {
  const getStatusColor = (statut) => {
    switch(statut) {
      case 'Acceptée': return 'acceptée';
      case 'Rejetée': return 'rejetée';
      case 'En attente': return 'en-attente';
      case 'Expirée': return 'expirée';
      default: return 'default';
    }
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Numéro Offre</th>
            <th>Article</th>
            <th>Fournisseur</th>
            <th>Prix Unitaire</th>
            <th>Quantité</th>
            <th>Montant Total</th>
            <th>Date Offre</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offres.length > 0 ? (
            offres.map((offre) => (
              <tr key={offre.id}>
                <td className="numero-cell">{offre.numero_offre}</td>
                <td className="name-cell">{offre.article?.nom}</td>
                <td>{offre.fournisseur?.nom}</td>
                <td className="price-cell">{offre.prix_unitaire?.toFixed(2)} DZD</td>
                <td className="quantity-cell">{offre.quantite}</td>
                <td className="total-cell">
                  <strong>{(offre.prix_unitaire * offre.quantite)?.toFixed(2)} DZD</strong>
                </td>
                <td>{new Date(offre.date_offre).toLocaleDateString('fr-FR')}</td>
                <td>
                  <span className={`status-badge ${getStatusColor(offre.statut)}`}>
                    {offre.statut}
                  </span>
                </td>
                <td className="actions-cell">
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => onEdit(offre)}
                    title="Modifier"
                  >
                    ✏️
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => onDelete(offre.id)}
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="empty-state">Aucune offre trouvée</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="table-footer">
        <p>Total: {offres.length} offre(s)</p>
        <p className="total-amount">
          Montant total: {offres.reduce((sum, offre) => sum + (offre.prix_unitaire * offre.quantite), 0).toFixed(2)} DZD
        </p>
      </div>
    </div>
  );
}

export default OffresTable;
