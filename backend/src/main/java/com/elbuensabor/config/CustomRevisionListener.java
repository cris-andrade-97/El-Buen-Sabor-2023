package com.elbuensabor.config;

import com.elbuensabor.entities.audit.Revision;
//import org.hibernate.envers.RevisionListener;

public class CustomRevisionListener extends Revision {
    public void newRevision(Object revisionEntity) {
        final Revision revision = (Revision) revisionEntity;
    }
}
